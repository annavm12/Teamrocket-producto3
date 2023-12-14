export const filterByCity = (days, city) => {
    if (!city) {
      return days;
    }
    return days.filter(item => item.city.toLowerCase().includes(city.toLowerCase()));
  };
  
  export const filterByTimeOfDay = (days, selectedTime) => {
    if (!selectedTime || selectedTime === "TodoElDia") {
      return days;
    }
    return days.filter(item => item.time === selectedTime);
  };
  