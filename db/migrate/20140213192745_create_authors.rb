class CreateAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      t.integer :id
      t.string :name
      t.string :firstname

      t.timestamps
    end
  end
end
