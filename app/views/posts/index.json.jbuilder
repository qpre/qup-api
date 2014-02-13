json.array!(@posts) do |post|
  json.extract! post, :id, :id, :author_id, :title, :date, :excerpt, :body
  json.url post_url(post, format: :json)
end
