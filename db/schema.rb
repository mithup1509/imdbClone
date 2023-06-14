# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_12_062439) do
  create_table "articles", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "moviedetails", force: :cascade do |t|
    t.string "title"
    t.integer "runtime"
    t.string "plot"
    t.string "actors"
    t.string "director"
    t.string "language"
    t.date "released"
    t.string "writer"
    t.string "country"
    t.string "genre"
    t.string "poster"
    t.string "movietype"
    t.decimal "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "userreviews", force: :cascade do |t|
    t.integer "movieid"
    t.integer "userid"
    t.string "review"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "rating"
  end

  create_table "watchlists", force: :cascade do |t|
    t.integer "movieid"
    t.integer "userid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
