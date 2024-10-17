import React from 'react';
import { FlatList } from 'react-native';
import { SearchInput, CategoryItem, CategoryImage, CategoryName } from '../styles/HomeStyles';

const Search = ({ searchQuery, handleSearch, categories, handleSelectCategory }) => {
  const filteredCategories = searchQuery
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []; // Exibir categorias filtradas, vazio se não houver busca

  return (
    <>
      <SearchInput
        placeholder="Buscar jogo..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {searchQuery && filteredCategories.length > 0 && ( // Renderiza categorias apenas se a busca não estiver vazia
        <FlatList
          data={filteredCategories}
          renderItem={({ item }) => (
            <CategoryItem onPress={() => handleSelectCategory(item)}>
              <CategoryImage source={item.image} />
              <CategoryName>{item.name}</CategoryName>
            </CategoryItem>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
};

export default Search;
