require 'faker'

class PokemonsController < ApplicationController
  def create
    # pokemon = Pokemon.create(pokemon_params)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: pokemon_params[:trainer_id])

    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    
    render json: {success: "success"}
  end

private

  def pokemon_params
    params.require(:pokemon).permit(:nickname, :species, :trainer_id)
  end
end
