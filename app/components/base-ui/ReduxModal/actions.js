const namespace = '@@redux-modal';

export const SHOW = `${namespace}/SHOW_MODAL`;
export const CLOSE = `${namespace}/CLOSE_MODAL`;

export const showModal = (name, props = {}) => ({ type: SHOW, payload: { name, props } });
export const closeModal = () => ({ type: CLOSE });
