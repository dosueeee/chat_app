Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    resources :messages 
    resources :contents
    resources :users do
      collection do
        get 'search'
      end
    end
  end
  
  root 'messages#index'
  devise_for :users
  # resources :users
  get "users/search" => "users#search"
  get "users/:id" => "users#show"
end
