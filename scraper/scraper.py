from urllib import response
from selenium import webdriver
from time import sleep
from selenium.webdriver.chrome.options import Options
from scrapy import Selector
import csv
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from supabase import create_client, Client

#create Supabase client

url = "https://oekeyzwvxekuznfupkka.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9la2V5end2eGVrdXpuZnVwa2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI1OTAxMjgsImV4cCI6MTk5ODE2NjEyOH0.JYFSf-xymsOm0FlbN4XtFieFY9hD5PzCgYcbIJ6NogU"
supabase: Client = create_client(url, key)

# Setting up the driver
chromeOptions = Options() # Setting up the chrome options
chromeOptions.add_experimental_option("excludeSwitches", ["enable-logging"]) # Disabling the logging
chromeOptions.add_argument("--headless") # Running the driver in headless mode 
chromePath = "chromedriver.exe" # Path to the chrome driver
driver = webdriver.Chrome(executable_path = chromePath, options = chromeOptions) # Setting up the driver
driver.maximize_window() # Maximizing the window


driver.get("https://www.4wdsupacentre.com.au/products.html?page=1") # Opening the website
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//div[@class="itemCountContainer-3Wi"]')))
response = Selector(text=driver.page_source) # Converting the page source to a response object

products = response.xpath('//div[@class="itemCountContainer-3Wi"]/text()').extract_first()
products = products.strip()
products = products.split(" ")
products = products[0]
products = int(products)
total_pages = products / 12 

if total_pages > int(total_pages):
   total_pages = int(total_pages) + 2
else:
   total_pages = int(total_pages) + 1
# print("Total Pages: ", total_pages)




# Opening the CSV File to write data in it
with open('4wdsupacentre.csv', 'w', newline='', encoding="utf-8-sig") as csvfile: 
   fieldnames = ["Product Link", "Product Name", "Product Price", "Shipping Price"] # adjust fieldnames
   writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
   writer.writeheader()
   
   for i in range(1, int(total_pages)): # Looping through all the pages
      link = "https://www.4wdsupacentre.com.au/products.html?page=" + str(i) # Creating the link
      driver.get(link)
      WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//div[@class="root-2fi null"]')))
      response = Selector(text=driver.page_source) # Converting the page source to a response object


      listings = response.xpath('//div[@class="root-2fi null"]') # Scraping all the listings on the page
      for listing in listings:
         product_link = listing.xpath('.//div[@class="name-1QF"]/a/@href').extract_first()
         

         product_name = listing.xpath('.//div[@class="name-1QF"]/a/text()').extract_first() # Scraping product name
         if product_name:
            product_name = product_name.strip()

           
         product_price = listing.xpath('.//div[@class="priceLine-1H-"]/div/span/text()').extract() # Scraping product price
         if product_price:
            product_price = "".join(product_price)
            product_price = product_price.strip()


         shipping_price = listing.xpath('.//span[@class="freightvalue-2VW"]/span/text()').extract() # Scraping shipping price
         if shipping_price:
            shipping_price = "".join(shipping_price)
            shipping_price = shipping_price.strip()
            shipping_price = shipping_price.replace("+ ", "")
         else:
            shipping_price = ""




         product_link = "https://www.4wdsupacentre.com.au" + product_link # Creating the product link
         # driver.get(product_link)

         try:
            # WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.XPATH, '//meta[@itemprop="sku"]')))
     
            # response = Selector(text=driver.page_source) # Converting the page source to a response object

            # sku = response.xpath('//meta[@itemprop="sku"]/@content').extract_first() # Scrapping SKU 
            # if sku:
            #    sku = sku.strip()

            # # Printing data on console 
            # print("-------------------------------------------------------------------")
            # print("Page Number: ", i)
            # print("Product Link: ", product_link)
            # print("Product Name: ", product_name)
            # print("Product Price: ", product_price)
            # print("Shipping Price: ", shipping_price)
            # print("SKU: ", sku)
            # print("-------------------------------------------------------------------")

            # Writing data to CSV File
            
            product = supabase.table('product').upsert({'product_name': product_name, 'product_link': product_link}).execute()

            price = supabase.table('price').insert({'product_price': product_price, 'shipping_price': shipping_price, 'product_link': product_link }).execute()
            # writer.writerow({
            #    "Product Link": product_link,
            #    "Product Name": product_name,
            #    "Product Price": product_price,
            #    "Shipping Price": shipping_price,
            #    # "SKU": sku
            # })
         except:
            pass
      print("Pages Scraped: ", i)

print("The Scraping has finished successfully!")
driver.close() # Closing the driver
driver.quit() # Quitting the driver