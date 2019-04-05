module Api
  module V1
    class RewardsController < Api::ApiController
      def index
        @rewards = [{
            id: "1850",
            reward_type: "sweepstake",
            social_media_types: [
                "Facebook",
                "Twitter",
                "Instagram"
            ],
            picture: "//app.popdeem.com/images/brand_default.png",
            cover_image: "https://s3-eu-west-1.amazonaws.com/popdeem/rewards/cover_images/000/001/850/original/coffee5.png?1502206827",
            created_at: "1502183339",
            rules: "Draw will take place at the end of every month.",
            status: "live",
            action: "photo",
            description: "Share a photo with #HeineBrosCoffee to win $25",
            remaining_count: "no limit",
            name: nil,
            available_until: "1511067540",
            available_next: "1509944400",
            no_time_limit: "false",
            global_hashtag: "#HeineBrosCoffee",
            recurrence: "Monthly",
            credit: "$25.00",
            tweet_options: {
                prefill: "",
                free_form: "",
                prefilled_message: "",
                forced_tag: "#HeineBrosCoffee",
                include_download_link: ""
            },
            instagram_option: {
                prefill: "",
                free_form: "",
                prefilled_message: "",
                forced_tag: "#HeineBrosCoffee",
                include_download_link: ""
            },
            twitter_media_characters: "24",
            disable_location_verification: "true",
            locations: [
                {
                    id: "848",
                    latitude: "38.2811",
                    longitude: "-85.6334",
                    address: "Heine Brothers' Coffee - Northfield, Brownsboro Road, Louisville, KY, United States",
                    number_of_rewards: 2,
                    twitter_page_id: nil,
                    fb_page_id: "",
                    fb_page_url: "",
                    brand: {
                        id: "448",
                        name: "Heine Bros'"
                    }
                }
            ]
          },{
            id: "1892",
            reward_type: "coupon",
            social_media_types: [
                "Facebook"
            ],
            picture: "//app.popdeem.com/images/brand_default.png",
            cover_image: "https://s3-eu-west-1.amazonaws.com/popdeem/rewards/cover_images/000/001/892/original/logo-backside_learning_center.png?1509641039",
            created_at: "1509640950",
            rules: " Check in and we'll donate to the Backside Learning Center at Churchill Downs!",
            status: "live",
            action: "checkin",
            description: "Checkin at HB-Northfield and we'll give 25¢ to the Backside Learning Center!",
            remaining_count: "no limit",
            name: nil,
            available_until: "1512097140",
            available_next: "1509595200",
            no_time_limit: "false",
            global_hashtag: "#heinebroscoffee",
            twitter_media_characters: "24",
            disable_location_verification: "false",
            locations: [
                {
                    id: "848",
                    latitude: "38.2811",
                    longitude: "-85.6334",
                    address: "Heine Brothers' Coffee - Northfield, Brownsboro Road, Louisville, KY, United States",
                    number_of_rewards: 2,
                    twitter_page_id: nil,
                    fb_page_id: "",
                    fb_page_url: "",
                    brand: {
                        id: "448",
                        name: "Heine Bros'"
                    }
                }
            ]
        },{
            id: "1849",
            reward_type: "coupon",
            social_media_types: [
                "Facebook"
            ],
            picture: "//app.popdeem.com/images/brand_default.png",
            cover_image: "https://s3-eu-west-1.amazonaws.com/popdeem/rewards/cover_images/000/001/849/original/WAVE4.png?1502365287",
            created_at: "1502183131",
            rules: "Connect Facebook, Twitter or Instagram to instantly earn 50c!",
            status: "live",
            action: "social_login",
            description: "Earn 50c for connecting your social account",
            remaining_count: "no limit",
            name: nil,
            available_until: "0",
            available_next: "1502161200",
            no_time_limit: "true",
            global_hashtag: "#HeineBrosCoffee",
            credit: "$0.50",
            twitter_media_characters: "24",
            disable_location_verification: "false",
            locations: []
        }]
          render :json => {"rewards" => @rewards}
      end
    end
  end
end
