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
  resources :friendships, only: [:create, :destroy]

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    omniauth: 'users/omniauth',
    passwords: 'users/passwords',
    sessions: 'users/sessions',
    unlocks: 'users/unlocks',
  }
  
  get "users/search" => "users#search"
  get "users/:id" => "users#show"
end
