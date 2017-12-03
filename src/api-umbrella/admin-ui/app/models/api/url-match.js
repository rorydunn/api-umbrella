import Ember from 'ember';
import DS from 'ember-data';
import { t } from 'api-umbrella-admin-ui/utils/i18n';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  frontendPrefix: [
    validator('presence', {
      presence: true,
      description: t('Frontend Prefix'),
    }),
    validator('format', {
      regex: CommonValidations.url_prefix_format,
      description: t('Frontend Prefix'),
      message: t('must start with "/"'),
    }),
  ],
  backendPrefix: [
    validator('presence', {
      presence: true,
      description: t('Backend Prefix'),
    }),
    validator('format', {
      regex: CommonValidations.url_prefix_format,
      description: t('Backend Prefix'),
      message: t('must start with "/"'),
    }),
  ],
});

export default DS.Model.extend(Validations, {
  sortOrder: DS.attr('number'),
  frontendPrefix: DS.attr(),
  backendPrefix: DS.attr(),

  backendPrefixWithDefault: Ember.computed('backendPrefix', 'frontendPrefix', function() {
    return this.get('backendPrefix') || this.get('frontendPrefix');
  }),
}).reopenClass({
  validationClass: Validations,
});
