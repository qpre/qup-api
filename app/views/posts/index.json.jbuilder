json.array!(@posts) do |post|
  json.extract! post, :id, :id, :user_id, :title, :date, :excerpt, :body
  json.url post_url(post, format: :json)
end
