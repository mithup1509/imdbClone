class CreateUserreviews < ActiveRecord::Migration[7.0]
  def change
    create_table :userreviews do |t|
      t.integer :movieid
      t.integer :userid
      t.string :review

      t.timestamps
    end
  end
end
