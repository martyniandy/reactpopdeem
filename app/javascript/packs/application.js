/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import WebpackerReact from 'webpacker-react'

import SocialHome from './components/pages/social_home/social_home'
import Messages from './components/pages/social_home/messages'
import SocialLogin from './components/pages/social_login'
import Share from './components/pages/share'

WebpackerReact.setup({SocialHome})
WebpackerReact.setup({SocialLogin})
WebpackerReact.setup({Share})
WebpackerReact.setup({Messages})
