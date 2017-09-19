class RemoveFromFromMessages < ActiveRecord::Migration[5.0]
  def change
    remove_column :messages, :from, :integer
  end
end
