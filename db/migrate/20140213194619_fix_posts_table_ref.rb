class FixPostsTableRef < ActiveRecord::Migration
  def change
  	rename_column :posts, :user, :author
  end
end
