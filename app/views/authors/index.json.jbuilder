json.array!(@authors) do |author|
  json.extract! author, :id, :id, :name, :firstname
  json.url author_url(author, format: :json)
end
