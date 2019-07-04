class TrainersController < ApplicationController

  def index
    trainers = Trainer.all.as_json(include: :pokemons)
    render json: trainers
  end

end
