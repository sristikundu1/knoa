import Swal from "sweetalert2";

// get function from localstorage
const getFavCourse = () => {
  const getCourseId = localStorage.getItem("wishlistCourse");

  if (getCourseId) {
    const storeCourseData = JSON.parse(getCourseId);
    return storeCourseData;
  } else {
    return [];
  }
};

// store the data in localstorage
const addCourseId = (id) => {
  const storeCourse = getFavCourse();

  if (storeCourse.includes(id)) {
    Swal.error();
    ("That Course is already in your wishlist");
    return;
  } else {
    storeCourse.push(id);
    const addCourseData = JSON.stringify(storeCourse);
    localStorage.setItem("wishlistCourse", addCourseData);
    window.dispatchEvent(new Event("wishlistUpdated"));
    Swal.fire("Course added to wishlist 📖", "", "success");
  }
};

// remove from wishlist

const removeCourse = (id) => {
  const RemoveStoreCourse = getFavCourse(); // get current stored course
  const updatedCourse = RemoveStoreCourse.filter((courseId) => courseId !== id); // remove the id
  localStorage.setItem("wishlistCourse", JSON.stringify(updatedCourse)); // save updated array
  // Dispatch a custom event to notify the whole app
  window.dispatchEvent(new Event("wishlistUpdated"));
  Swal.fire("Removed from wishlist", "", "success");
};

export { getFavCourse, addCourseId, removeCourse };
