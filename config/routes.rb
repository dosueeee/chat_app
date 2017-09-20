Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    resources :messages 
    resources :contents
  end
  # get "users/:id" => "users#show"
  root 'messages#index'
  devise_for :users
  # resources :users
  get "users/:id" => "users#show"
end
