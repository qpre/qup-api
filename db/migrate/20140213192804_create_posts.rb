class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :id
      t.references :user, index: true
      t.string :title
      t.datetime :date
      t.string :excerpt
      t.text :body

      t.timestamps
    end
  end
end
