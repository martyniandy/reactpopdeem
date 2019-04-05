# Popdeem Web

## Deployed
popdeem-web-demo on Heroku Popdeem Account

## Routing
To direct a subdomain to the web app, in AWS Route53 add a new CNAME Record like follows:

Name: the subdomain `slug` you want to use
Alias: `No`
Value: `slug`.popdeem.com.herokudns.com

This will then route all traffic for `slug.popdeem.com` to the web app. Now you need to create a customer on the web app.

To do this in rails console:
```
customer = Customer.find_or_create_by(:slug => 'slug', :api_key => 'Popdeem_API_KEY')

insta_cis = CustomerInstagramSetting.find_or_create_by(:customer_id => customer.id, :client_id => "Instagram_Client_ID", :client_secret => "Instagram_Client_Secret")
insta_cis.save!

face_cis = CustomerFacebookSetting.find_or_create_by(:customer_id=> customer.id, :app_id => "Facebook_App_ID", :app_access_token => "Facebook_App_Token")
face_cis.save!

twit_cis = CustomerTwitterSetting.find_or_create_by(:customer_id => customer.id, :consumer_key => "Twitter_Consumer_Key", :consumer_secret => "Twitter_Consumer_Secret")
twit_cis.save!

customer.customer_facebook_setting_id = face_cis.id
customer.customer_instagram_setting_id = insta_cis.id
customer.customer_twitter_setting_id = twit_cis.id
customer.save!

CustomerTheme.create(customer_id: customer.id,
              colour_primary: "#000000",
              colour_primary_inverse: "#24C7EA",
              colour_view_background: "#F4F4F4",
              colour_table_background: "#FFFFFF",
              colour_primary_text: "#000000",
              colour_secondary_text: "#000000",
              colour_tertiary_text: "#FBD131",
              colour_tableview_seperator: "#C0C0C0",
              colour_tabbar_background: "#31251E",
              colour_tabbar_foreground: "#FBD131",
              colour_tabbar_selection: "#FBD131",
              colour_home_header_text: "#FFFFFF",
              image_home_header: "",
              image_social_login: "")

```

When this is set up, when traffic comes into the web app, the `CustomerDomainConstraint` will take care of loading the correct customer, or bounce the user to popdeem.com if there is no customer with a matching slug.
