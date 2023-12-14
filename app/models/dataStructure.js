const infoExample = {
  title: 'Title', // String
  hotel: 'Hotel Name', // String
  text: 'Activity Text', // String
  description: 'Detailed Description', // String
  video: 'Video URL' // String
};

const dayExample = {
  id: '1', // String (optional)
  dayNumber: 1, // Number
  city: 'City Name', // String
  resume: 'Description', // String
  time: 'Mañana', // String
  info: infoExample // Object of type IInfo
};

export { infoExample, dayExample };