const {Thought, User}= require('../models')

const thoughtController= {
    addThought({ body }, res) {
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts:  _id} },
              { new: true }
            );
          })
          .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      deleteThought({ body}, res){
        Thought.findOneAndDelete({_id: body.thoughtId})
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $pull: { thoughts: body.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserdata => {
            if (!dbUserdata) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserdata);
          })
      },
      updateThought({body}, res){
        Thought.findOneAndUpdate({_id: body.thoughtId}, {thoughtText: body.thoughtText}, { new: true, runValidators: true })
          .then(dbThoughtData=> {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData)
          })
          .catch(err => res.json(err));
      },
      getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
      },
      getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
      createReaction({params, body}, res){
        Thought.findOneAndUpdate({ _id: params.thoughtId },{$push: {reactions: body} }, { new: true})
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
      },
      deleteReaction({params, body}, res){
        Thought.findOneAndUpdate({ _id: params.thoughtId },{$pull: {reactions: {reactionId: params.reactionId}} }, { new: true})
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
      }
}

module.exports= thoughtController;