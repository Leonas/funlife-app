Feature: Design and Build a Ruby on Rails web app using Behaviour Driven Development (BDD)
  In order to produce a web app at low cost and high speed
  A developer
  Should employ Ruby on Rails with Cucumber BDD tools

  Scenario: Cucumber-Rails should be installed and configured
    Given I am in a rails project root
    And I have installed cucumber-rails
    And I do not have a cucumber environment
    When I run the cucumber-rails generator
    Then I should have a cucumber environment

Feature:
  In order to use the app
  A person
  Must use login or register, unless they click 'explore'

  Scenario:
    Given I start the app
    When  I click on explore
    Then  I see the home screen

