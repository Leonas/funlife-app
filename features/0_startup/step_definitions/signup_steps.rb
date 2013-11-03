Given(/^I am on the front page$/) do
  pending # express the regexp above with the code you wish you had


end

When(/^I enter my email and password$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see register_step_(\d+)$/) do |arg1|
  pending # express the regexp above with the code you wish you had

          # Stub and return text, json, jsonp (or anything else
  proxy.stub('http://localhost:8282/register/').and_return(:json => { :foo => 'bar' })


# Pass a Proc (or Proc-style object) to create dynamic responses.
#
# The proc will be called with the following arguments:
#   params:  Query string parameters hash, CGI::escape-style
#   headers: Headers hash
#   body:    Request body string
#
#  proxy.stub('https://example.com/proc/').and_return(Proc.new { |params, headers, body|
#    { :text => "Hello, #{params['name'][0]}"}
#  })
end