// const db = require('./database');
const axios = require('axios');
exports.testDB = async (db) => {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

exports.reverseComments = (dataArray) => {
    const reversedComments = dataArray.map(movie => {
        if (movie.comments.length > 0) {
            movie.comments = movie.comments.sort((a, b) => b.id - a.id);
        }
        return movie;
    })
    return reversedComments;
};

exports.getCharacterList = async (movieData) => {
    let characterLink = '';
    let characterList = [];
    for (let i = 0; i < movieData.characters.length; i++) {
        characterLink = movieData.characters[i];
        const character = await axios.get(characterLink);
        characterList.push(character.data);
    }
    // let characterList = movieData.characters.map(async (characterLink) => {
    //     const character = await axios.get(characterLink);
    //     return character.data;
    // });
    return characterList;
};

exports.sortCharacters = (characterList, nameSort, genderSort, heightSort) => {
    let sortedData = characterList;
    if (nameSort) nameSort.toLowerCase();
    if (genderSort) genderSort.toLowerCase();
    if (heightSort) heightSort.toLowerCase();

    if (nameSort === 'asc') {
        sortedData = characterList.sort((a, b) => a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0))
    }
    else if (nameSort === 'desc') {
        sortedData = characterList.sort((a, b) => b.name[0].charCodeAt(0) - a.name[0].charCodeAt(0))
    }
    if (genderSort === 'asc') {
        sortedData = characterList.sort((a, b) => a.gender[0].charCodeAt(0) - b.gender[0].charCodeAt(0))
    }
    else if (genderSort === 'desc') {
        sortedData = characterList.sort((a, b) => b.gender[0].charCodeAt(0) - a.gender[0].charCodeAt(0))
    }
    if (heightSort === 'asc') {
        sortedData = characterList.sort((a, b) => parseInt(a.height) - parseInt(b.height))
    }
    else if (heightSort === 'desc') {
        sortedData = characterList.sort((a, b) => parseInt(b.height) - parseInt(a.height))
    }
    return sortedData;
};

exports.getResult = async (data) => {
    let heightCount = 0;
    let heightInfo = ``;
    let result = {};

    let totalNumberOfCharacters = data.length
    for (let i = 0; i < data.length; i++) {
        heightCount += parseInt(data[i].height)
    }
    heightInfo = `${heightCount}cm makes ${Math.round(heightCount / 30.48)}ft and ${(heightCount / 2.54).toFixed(2)} inches`

    result = {
        totalNumberOfCharacters: totalNumberOfCharacters,
        totalHeightOfCharacters: heightInfo,
        characterInfo: data
    }
    return result;
};