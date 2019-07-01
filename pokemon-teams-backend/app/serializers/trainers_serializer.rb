class TrainersSerializer
  def initialize(trainer_obj)
    @trainer_obj = trainer_obj
  end

  def to_serialized_json
    options = {
      include:{
        pokemons: {
          except:[:updated_at, :created_at]
        }
      },
      except: [:updated_at, :created_at]
    }
    @trainer_obj.to_json(options)
  end
end
