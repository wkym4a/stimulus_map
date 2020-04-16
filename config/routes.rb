Rails.application.routes.draw do
  root 'top#form'

  resources :maps
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
