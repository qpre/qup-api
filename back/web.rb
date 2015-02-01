require 'sinatra'

get '/' do
  redirect '/index.html'
end

get '/wip' do
  redirect '/public/index2.html'
end
