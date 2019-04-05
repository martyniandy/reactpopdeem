# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180225235040) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customer_facebook_settings", force: :cascade do |t|
    t.bigint "customer_id"
    t.string "app_id"
    t.string "app_access_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_customer_facebook_settings_on_customer_id"
  end

  create_table "customer_instagram_settings", force: :cascade do |t|
    t.bigint "customer_id"
    t.string "client_id"
    t.string "client_secret"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_customer_instagram_settings_on_customer_id"
  end

  create_table "customer_themes", force: :cascade do |t|
    t.bigint "customer_id"
    t.string "colour_primary"
    t.string "colour_primary_inverse"
    t.string "colour_view_background"
    t.string "colour_table_background"
    t.string "colour_primary_text"
    t.string "colour_secondary_text"
    t.string "colour_tertiary_text"
    t.string "colour_tableview_seperator"
    t.string "colour_tabbar_background"
    t.string "colour_tabbar_foreground"
    t.string "colour_tabbar_selection"
    t.string "colour_home_header_text"
    t.string "image_home_header"
    t.string "image_social_login"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_customer_themes_on_customer_id"
  end

  create_table "customer_twitter_settings", force: :cascade do |t|
    t.bigint "customer_id"
    t.string "consumer_key"
    t.string "consumer_secret"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_customer_twitter_settings_on_customer_id"
  end

  create_table "customers", force: :cascade do |t|
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "api_key"
    t.bigint "customer_facebook_setting_id"
    t.bigint "customer_twitter_setting_id"
    t.bigint "customer_instagram_setting_id"
    t.index ["customer_facebook_setting_id"], name: "index_customers_on_customer_facebook_setting_id"
    t.index ["customer_instagram_setting_id"], name: "index_customers_on_customer_instagram_setting_id"
    t.index ["customer_twitter_setting_id"], name: "index_customers_on_customer_twitter_setting_id"
  end

  create_table "user_facebook_accounts", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "social_account_id"
    t.string "facebook_id"
    t.boolean "tester"
    t.string "access_token"
    t.integer "expiration_time"
    t.string "profile_picture_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_facebook_accounts_on_user_id"
  end

  create_table "user_instagram_accounts", force: :cascade do |t|
    t.integer "social_account_id"
    t.string "instagram_id"
    t.boolean "tester"
    t.string "access_token"
    t.string "access_secret"
    t.string "profile_picture_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_user_instagram_accounts_on_user_id"
  end

  create_table "user_twitter_accounts", force: :cascade do |t|
    t.integer "social_account_id"
    t.string "twitter_id"
    t.boolean "tester"
    t.string "access_token"
    t.string "access_secret"
    t.integer "expiration_time"
    t.string "profile_picture_url"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_twitter_accounts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "sex"
    t.string "college"
    t.string "type"
    t.decimal "last_location_lat"
    t.decimal "last_location_long"
    t.integer "popdeem_id"
    t.string "app_version"
    t.string "user_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "customer_id"
    t.string "facebook_access_token"
    t.string "facebook_profile_picture_url"
    t.string "twitter_access_token"
    t.string "twitter_access_secret"
    t.string "twitter_profile_picture_url"
    t.string "instagram_access_token"
    t.string "instagram_access_secret"
    t.string "instagram_profile_picture_url"
    t.string "facebook_id"
    t.string "twitter_id"
    t.string "instagram_id"
    t.string "facebook_access_secret"
    t.index ["customer_id"], name: "index_users_on_customer_id"
  end

  add_foreign_key "customer_facebook_settings", "customers"
  add_foreign_key "customer_instagram_settings", "customers"
  add_foreign_key "customer_themes", "customers"
  add_foreign_key "customer_twitter_settings", "customers"
  add_foreign_key "customers", "customer_facebook_settings"
  add_foreign_key "customers", "customer_instagram_settings"
  add_foreign_key "customers", "customer_twitter_settings"
  add_foreign_key "user_facebook_accounts", "users"
  add_foreign_key "user_instagram_accounts", "users"
  add_foreign_key "user_twitter_accounts", "users"
  add_foreign_key "users", "customers"
end
