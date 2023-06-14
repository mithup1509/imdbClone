class CreateMoviedetails < ActiveRecord::Migration[7.0]
  def change
    create_table :moviedetails do |t|
      t.string :title
      t.integer :runtime
      t.string :plot
      t.string :actors
      t.string :director
      t.string :language
      t.date :released
      t.string :writer
      t.string :country
      t.string :genre
      t.string :poster
      t.string :movietype
      t.decimal :rating

      t.timestamps
    end
  end
end
