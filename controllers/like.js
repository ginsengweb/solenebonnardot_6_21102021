const Sauce = require("../models/sauce")

exports.LikeOption = (req, res, next) => {
  const like = req.body.like
  const userId = req.body.userId

  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      if (like === 1) {
        let likeUser = checkUser(sauce.usersLiked, userId)
        if (!likeUser) {
          sauce.likes += 1
          sauce.usersLiked.push(userId)
        } else {
          throw new Error("On ne peut liker une sauce qu'une seule fois")
        }
      } else if (like === -1) {
        let dislikeUser = checkUser(sauce.usersDisliked, userId)
        if (!dislikeUser) {
          sauce.dislikes += 1
          sauce.usersDisliked.push(userId)
        } else {
          throw new Error("On ne peut disliker une sauce qu'une seule fois")
        }
      } else if (like === 0) {
        let userLiked = sauce.usersLiked.find(id => id === userId)
        if (userLiked) {
          sauce.likes -= 1
          sauce.usersLiked = createNewUserIdArray(sauce.usersLiked, userId)
        } else {
          let userDisliked = sauce.usersDisliked.find(id => id === userId)
          if (userDisliked) {
            sauce.dislikes -= 1
            sauce.usersDisliked = createNewUserIdArray(
              sauce.usersDisliked,
              userId
            )
          }
        }
      }
      sauce
        .save()
        .then(() =>
          res.status(201).json({message: "Like / Dislike enregistré"})
        )
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(403).json({error: error.message}))
}
function createNewUserIdArray(userIdArray, userId) {
  return userIdArray.filter(id => id !== userId)
}
function checkUser(userIdArray, userId) {
  return userIdArray.find(id => id === userId)
}
