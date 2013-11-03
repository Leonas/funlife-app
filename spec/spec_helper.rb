#two test suites. one remote, one local. both are same thing but just connect to seperate urls?

require 'rubygems'
require 'spork'
require 'billy/rspec'
#require 'spork/ext/ruby-debug'

Spork.prefork do
  require 'rubygems'

  ENV['RAILS_ENV'] ||= 'test'
  require File.expand_path('../../config/environment', __FILE__)
  require 'rspec/rails'

  require 'rspec/autorun'





# select a driver for your chosen browser environment
  Capybara.javascript_driver = :selenium_billy
# Capybara.javascript_driver = :webkit_billy
# Capybara.javascript_driver = :poltergeist_billy



#  require 'database_cleaner'       #does this need pg or other? for the remote stuff
#  require 'capybara/rails'
  require 'capybara/rspec'
  require 'capybara/poltergeist'
  Capybara.register_driver :poltergeist do |app|
    Capybara::Poltergeist::Driver.new(app, inspector: true, phantomjs_logger: {})
  end
  Capybara.default_driver = :poltergeist

  #Whether start server when testing
  Capybara.run_server = true

  Capybara.server_port = 8200                                                   #this requires some updating of folder names

  #Capybara.ignore_hidden_elements = true           this causes problems

  #Requires supporting ruby files with custom matchers, macros, etc in spec/support/.
  Dir[Rails.root.join('spec/support/**/*.rb')].each {|f| require f}

  RSpec.configure do |config|
    # Use color in STDOUT
    config.color_enabled = true
    # Use color not only in STDOUT but also in pagers and files
    config.tty = true
    # Use the specified formatter
    config.formatter = :progress #:documentation # :progress, :html, :textmate

    config.order = 'random'
    config.use_transactional_fixtures = false

    #config.before(:suite) do
    #  DatabaseCleaner.strategy = :truncation
    #  DatabaseCleaner.clean
    #end
    #
    #config.before(:each) do
    #  DatabaseCleaner.start
    #end
    #
    #config.after(:each) do
    #  DatabaseCleaner.clean
    #end

  end


end

Spork.each_run do
  #do something here each time spork is run

end
