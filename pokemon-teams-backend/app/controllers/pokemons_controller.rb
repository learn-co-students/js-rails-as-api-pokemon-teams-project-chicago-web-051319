class PokemonsController < ApplicationController
  def create
    pokemon = Pokemon.create(pokemon_params)
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end

private

  def pokemon_params
    params.require(:pokemon).permit(:nickname, :species, :trainer_id)
  end
end
