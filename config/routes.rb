Rails.application.routes.draw do

  # api
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create] do
      collection do
        post :upload_image
      end
    end
    resources :contents
    resources :friendships, only: [:create, :destroy]
    resources :current_user, only: [:index]
    resources :users, only: [:index, :show, :create] do
      collection do
        get 'search'
      end
    end
  end

  # 通常
  root 'messages#index'
  resources :friendships, only: [:create]

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    omniauth: 'users/omniauth',
    passwords: 'users/passwords',
    sessions: 'users/sessions',
    unlocks: 'users/unlocks',
  }
  
  get "users/search" => "users#search"
  get "users/:id" => "users#show", as: "user"
end
