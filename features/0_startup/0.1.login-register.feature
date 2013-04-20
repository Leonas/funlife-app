Feature:
  In order to sign up
  As a guest
  I want to create a new account

  Scenario:
    Given I am on the front page
    When  I enter my email and password
    Then  I should see register_step_2
