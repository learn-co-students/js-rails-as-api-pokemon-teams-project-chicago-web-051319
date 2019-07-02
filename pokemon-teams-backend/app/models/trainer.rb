class Trainer < ApplicationRecord
  has_many :pokemons

  def limit
    self.pokemons.length < 6
  end

  # def pokemons
  #   Pokemon.select {|pokemon| pokemon.trainer_id == self.id}
  # end

end
