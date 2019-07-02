require 'faker'

class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
  end

  def create
    if Trainer.find(params[:id]).pokemons.count < 6
      name =  Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params['id'])
      render json: pokemon
    else
      render json: {error: "This trainer's team is full ☹️"}, status: 409
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: {message: 'success'}
  end

end
