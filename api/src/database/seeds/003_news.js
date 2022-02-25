const {v4: uuidv4} = require('uuid')
const ids = require('../../utils/seeds_id')

exports.seed = (knex) => {
  
  return knex('news').del()
    .then(() =>{
      // Inserts seed entries
      return knex('news').insert([
        {
          id: uuidv4(),
          title: "PS5 abaixa o preço novamente", 
          slug: "ps5-abaixa-o-preco-novamente", 
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat sodales ex sed venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, risus non congue faucibus, erat turpis hendrerit nisi, in gravida metus metus quis lacus. Sed id hendrerit velit, a posuere lectus. Cras lobortis egestas neque at consequat. Sed porttitor massa feugiat laoreet fermentum. Mauris pharetra bibendum tortor at tincidunt. Mauris sit amet bibendum sapien. Vestibulum quis tellus mi. Ut placerat turpis sit amet tincidunt cursus. Quisque et iaculis elit, sit amet vulputate lorem. Pellentesque quam massa, auctor id urna nec, facilisis ultrices urna. Aenean tortor lorem, suscipit rhoncus mattis a, suscipit in tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat sodales ex sed venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, risus non congue faucibus, erat turpis hendrerit nisi, in gravida metus metus quis lacus. Sed id hendrerit velit, a posuere lectus. Cras lobortis egestas neque at consequat. Sed porttitor massa feugiat laoreet fermentum. Mauris pharetra bibendum tortor at tincidunt. Mauris sit amet bibendum sapien. Vestibulum quis tellus mi. Ut placerat turpis sit amet tincidunt cursus. Quisque et iaculis elit, sit amet vulputate lorem. Pellentesque quam massa, auctor id urna nec, facilisis ultrices urna. Aenean tortor lorem, suscipit rhoncus mattis a, suscipit in tellus.",
          is_active: true,
          user_id: ids.user1,
          category_id: ids.category1,
        },
        {
          id: uuidv4(),
          title: "Trailer do novo God of War é revelado", 
          slug: "trailer-do-novo-god-of-war-e-revelado", 
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat sodales ex sed venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, risus non congue faucibus, erat turpis hendrerit nisi, in gravida metus metus quis lacus. Sed id hendrerit velit, a posuere lectus. Cras lobortis egestas neque at consequat. Sed porttitor massa feugiat laoreet fermentum. Mauris pharetra bibendum tortor at tincidunt. Mauris sit amet bibendum sapien. Vestibulum quis tellus mi. Ut placerat turpis sit amet tincidunt cursus. Quisque et iaculis elit, sit amet vulputate lorem. Pellentesque quam massa, auctor id urna nec, facilisis ultrices urna. Aenean tortor lorem, suscipit rhoncus mattis a, suscipit in tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat sodales ex sed venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, risus non congue faucibus, erat turpis hendrerit nisi, in gravida metus metus quis lacus. Sed id hendrerit velit, a posuere lectus. Cras lobortis egestas neque at consequat. Sed porttitor massa feugiat laoreet fermentum. Mauris pharetra bibendum tortor at tincidunt. Mauris sit amet bibendum sapien. Vestibulum quis tellus mi. Ut placerat turpis sit amet tincidunt cursus. Quisque et iaculis elit, sit amet vulputate lorem. Pellentesque quam massa, auctor id urna nec, facilisis ultrices urna. Aenean tortor lorem, suscipit rhoncus mattis a, suscipit in tellus.",
          is_active: true,
          user_id: ids.user1,
          category_id: ids.category2,
        },
        {
          id: uuidv4(),
          title: "Fortnite mobile supera Free Fire em número de jogadores", 
          slug: "fortnite-mobile-supera-free-fire-em-numero-de-jogadores", 
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat sodales ex sed venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, risus non congue faucibus, erat turpis hendrerit nisi, in gravida metus metus quis lacus. Sed id hendrerit velit, a posuere lectus. Cras lobortis egestas neque at consequat. Sed porttitor massa feugiat laoreet fermentum. Mauris pharetra bibendum tortor at tincidunt. Mauris sit amet bibendum sapien. Vestibulum quis tellus mi. Ut placerat turpis sit amet tincidunt cursus. Quisque et iaculis elit, sit amet vulputate lorem. Pellentesque quam massa, auctor id urna nec, facilisis ultrices urna. Aenean tortor lorem, suscipit rhoncus mattis a, suscipit in tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat sodales ex sed venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, risus non congue faucibus, erat turpis hendrerit nisi, in gravida metus metus quis lacus. Sed id hendrerit velit, a posuere lectus. Cras lobortis egestas neque at consequat. Sed porttitor massa feugiat laoreet fermentum. Mauris pharetra bibendum tortor at tincidunt. Mauris sit amet bibendum sapien. Vestibulum quis tellus mi. Ut placerat turpis sit amet tincidunt cursus. Quisque et iaculis elit, sit amet vulputate lorem. Pellentesque quam massa, auctor id urna nec, facilisis ultrices urna. Aenean tortor lorem, suscipit rhoncus mattis a, suscipit in tellus.",
          is_active: true,
          user_id: ids.user2,
          category_id: ids.category3,
        },
        {
          id: uuidv4(),
          title: "Fallen e S1mple jogarão na Astralis", 
          slug: "fallen-e-s1mple-jogarao-na-astralis", 
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat sodales ex sed venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, risus non congue faucibus, erat turpis hendrerit nisi, in gravida metus metus quis lacus. Sed id hendrerit velit, a posuere lectus. Cras lobortis egestas neque at consequat. Sed porttitor massa feugiat laoreet fermentum. Mauris pharetra bibendum tortor at tincidunt. Mauris sit amet bibendum sapien. Vestibulum quis tellus mi. Ut placerat turpis sit amet tincidunt cursus. Quisque et iaculis elit, sit amet vulputate lorem. Pellentesque quam massa, auctor id urna nec, facilisis ultrices urna. Aenean tortor lorem, suscipit rhoncus mattis a, suscipit in tellus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat sodales ex sed venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, risus non congue faucibus, erat turpis hendrerit nisi, in gravida metus metus quis lacus. Sed id hendrerit velit, a posuere lectus. Cras lobortis egestas neque at consequat. Sed porttitor massa feugiat laoreet fermentum. Mauris pharetra bibendum tortor at tincidunt. Mauris sit amet bibendum sapien. Vestibulum quis tellus mi. Ut placerat turpis sit amet tincidunt cursus. Quisque et iaculis elit, sit amet vulputate lorem. Pellentesque quam massa, auctor id urna nec, facilisis ultrices urna. Aenean tortor lorem, suscipit rhoncus mattis a, suscipit in tellus.",
          is_active: true,
          user_id: ids.user2,
          category_id: ids.category4,
        },
      ]);
    });
};
