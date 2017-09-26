class CreateAccesses < ActiveRecord::Migration[5.0]
  def change
    create_table :accesses do |t|
      t.integer :user_id
      t.integer :to_user_id
      t.datetime :last_access

      t.timestamps
    end
  end
end
