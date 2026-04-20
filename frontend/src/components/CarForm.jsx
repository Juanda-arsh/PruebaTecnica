import { SaveIcon } from './Icons';
import { LoadingButton } from './LoadingButton';

export function CarForm({ initialValues, loading, submitLabel, onSubmit }) {
  const values = initialValues || {
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    plate: '',
    color: '',
    photoUrl: ''
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      brand: formData.get('brand').trim(),
      model: formData.get('model').trim(),
      year: Number(formData.get('year')),
      plate: formData.get('plate').trim(),
      color: formData.get('color').trim(),
      photoUrl: formData.get('photoUrl').trim()
    });
  }

  function handleYearInput(event) {
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').slice(0, 4);
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Marca</span>
          <input name="brand" defaultValue={values.brand} maxLength="80" required />
        </label>
        <label>
          <span>Modelo</span>
          <input name="model" defaultValue={values.model} maxLength="80" required />
        </label>
        <label>
          <span>A&ntilde;o</span>
          <input
            name="year"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="4"
            defaultValue={values.year}
            onInput={handleYearInput}
            required
          />
        </label>
        <label>
          <span>Placa</span>
          <input name="plate" defaultValue={values.plate} maxLength="20" required />
        </label>
        <label>
          <span>Color</span>
          <input name="color" defaultValue={values.color} maxLength="50" required />
        </label>
        <label className="full-field">
          <span>Foto URL</span>
          <input name="photoUrl" defaultValue={values.photoUrl || ''} maxLength="500" placeholder="https://..." />
        </label>
      </div>

      <div className="form-actions">
        <LoadingButton loading={loading} type="submit" className="button button-primary">
          <SaveIcon />
          {submitLabel}
        </LoadingButton>
      </div>
    </form>
  );
}
