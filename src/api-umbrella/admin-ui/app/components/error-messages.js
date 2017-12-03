import Ember from 'ember';
import { t } from 'api-umbrella-admin-ui/utils/i18n';

export default Ember.Component.extend({
  messages: Ember.computed('model.clientErrors', 'model.serverErrors', function() {
    let errors = [];

    let clientErrors = this.get('model.clientErrors');
    if(clientErrors) {
      if(_.isArray(clientErrors)) {
        _.each(clientErrors, function(clientError) {
          let message = clientError.get('message');
          if(message) {
            errors.push({
              attribute: clientError.get('attribute'),
              message: message,
            });
          } else {
            errors.push({ message: t('Unexpected error') });
          }
        });
      } else {
        errors.push({ message: t('Unexpected error') });
      }
    }

    let serverErrors = this.get('model.serverErrors');
    if(serverErrors) {
      if(_.isArray(serverErrors)) {
        _.each(serverErrors, function(serverError) {
          let message = serverError.message;
          if(!message && serverError.title) {
            message = serverError.title;
            if(serverError.status) {
              message += ' (Status: ' + serverError.status + ')';
            }
          }

          if(message) {
            errors.push({
              attribute: serverError.field,
              message: message,
              fullMessage: serverError.full_message,
            });
          } else {
            errors.push({ message: t('Unexpected error') });
          }
        });
      } else {
        errors.push({ message: t('Unexpected error') });
      }
    }

    let messages = [];
    _.each(errors, function(error) {
      let message = '';
      if(error.fullMessage) {
        message += error.fullMessage;
      } else {
        message += error.message || t('Unexpected error');
      }

      messages.push(marked(message));
    });

    return messages;
  }),

  hasErrors: Ember.computed('messages', function() {
    return (this.get('messages').length > 0);
  }),
});
