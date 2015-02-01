require 'sinatra'

get '/' do
  redirect '/index.html'
end

get '/wip' do
  redirect '/index2.html'
end
