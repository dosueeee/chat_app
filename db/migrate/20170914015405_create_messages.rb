class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :contents
      t.integer :from

      t.timestamps
    end
  end
end
