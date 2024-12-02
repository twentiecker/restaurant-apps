export function generateRestoItemUsingTemplate({
  id,
  pictureId,
  name,
  rating,
  description,
}) {
  const restoItemTemplate = document.getElementById("restoitemtemplate");

  const element = restoItemTemplate.content.cloneNode(true);

  const article = element.querySelector("[data-restoid]");
  article.setAttribute("data-restoid", id);

  const restoImage = element.getElementById("restoImage");
  restoImage.src = pictureId;
  restoImage.alt = name;

  const restoName = element.getElementById("restoName");
  restoName.textContent = name;

  const restoRating = element.getElementById("restoRating");
  restoRating.innerHTML = "Rating: " + rating;

  const restoDescription = element.getElementById("restoDescription");
  restoDescription.innerHTML = description;

  return element;
}
