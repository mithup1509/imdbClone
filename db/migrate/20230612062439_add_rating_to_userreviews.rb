class AddRatingToUserreviews < ActiveRecord::Migration[7.0]
  def change
    add_column :userreviews, :rating, :integer
  end
end
