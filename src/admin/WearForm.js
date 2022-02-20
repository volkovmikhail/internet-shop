import React, { useState, useContext, useEffect } from 'react';
import styles from './wearform.module.css';
import { AuthContext } from '../AuthContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAlert } from 'react-alert';

function WearFrom({ id, isUpdate, wears }) {
  const alert = useAlert();
  const text = isUpdate ? 'Редактировать' : 'Добавить';
  const categories = [...new Set(wears.map((w) => w.category))];
  const { token } = useContext(AuthContext);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('BYN');
  const [sex, setSex] = useState('1');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (isUpdate) {
      fetch(`/api/wear/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const d = data.data[0];
          setImages(d.images);
          setCategory(d.category);
          setQuantity(d.quantity);
          setSex(d.sex);
          setCurrency(d.currency);
          setPrice(d.price);
          setDiscription(d.discription);
          setTitle(d.title);
          setDisabledSubmit(false);
          setSizes(d.sizes);
        });
      return;
    }
    setDisabledSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function categoryHandler(value, isSelect) {
    if (isSelect) {
      if (value === 'custom') {
        return;
      }
    }
    setCategory(value);
  }

  async function fileInputHandler(e) {
    if (e.target.files.length === 0 || !token) {
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append(`images`, e.target.files[i]);
    }
    try {
      const response = await (
        await fetch('/api/wear/images', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
      ).json();
      setImages([...images, ...response]);
      e.target.value = null;
    } catch (error) {
      alert.error('Failed to upload');
    }
  }

  function onDragEndHandler(result) {
    if (!result.destination) return;
    const items = [...images];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  }

  async function submitHandler(e) {
    e.preventDefault();
    setDisabledSubmit(true);
    if (
      title.trim().length < 1 ||
      discription.trim().length < 1 ||
      images.length === 0 ||
      sizes.length === 0 ||
      category.trim().length < 1 ||
      isNaN(parseFloat(price)) ||
      isNaN(parseFloat(quantity))
    ) {
      alert.error('Что-то не так с данными!');
      setDisabledSubmit(false);
      return;
    }
    const priceParsed = parseFloat(price);
    const quantityParsed = parseFloat(quantity);
    const formData = new FormData();
    formData.append(`images`, JSON.stringify(images));
    formData.append(`title`, title);
    formData.append(`discription`, discription);
    formData.append(`price`, priceParsed);
    formData.append(`quantity`, quantityParsed);
    formData.append(`category`, category);
    formData.append(`currency`, currency);
    formData.append(`sex`, sex);
    formData.append(`sizes`, JSON.stringify(sizes));
    const url = isUpdate ? `/api/wear/${id}` : '/api/addwear';
    const rawResponse = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (rawResponse.status !== 200) {
      alert.error('что-то не так!');
      setDisabledSubmit(false);
      return;
    }
    setDisabledSubmit(false);
    alert.success(isUpdate ? 'Успешно обновлено' : 'Товар добавлен');
    if (!isUpdate) {
      setImages([]);
      setCategory('');
      setQuantity('');
      setSex('1');
      setCurrency('BYN');
      setPrice('');
      setDiscription('');
      setTitle('');
      setSizes([]);
    }
  }

  function deleteImage(i) {
    const newArr = [...images];
    newArr.splice(i, 1);
    setImages(newArr);
  }

  const [addSize, setAddSize] = useState('');
  function addSizeHandler() {
    if (!addSize) {
      return;
    }
    setSizes([...sizes, addSize]);
    setAddSize('');
  }

  function delSize(id) {
    const newArr = [...sizes];
    newArr.splice(id, 1);
    setSizes(newArr);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <h2>{text}</h2>
        <label className={styles.label}>Название</label>
        <input
          type="text"
          name="title"
          className={styles.input}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          placeholder="Title"
        />

        <label className={styles.label}>Описание</label>
        <textarea
          name="discription"
          className={styles.input}
          value={discription}
          onChange={(e) => {
            setDiscription(e.target.value);
          }}
        />

        <label className={styles.label}>Цена</label>
        <input
          type="text"
          name="price"
          className={styles.input}
          placeholder="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <label className={styles.label}>Валюта</label>
        <select
          className={styles.input}
          name="currency"
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
        >
          <option value="BYN">BYN</option>
        </select>

        <label className={styles.label}>Мужское / Женское</label>
        <select
          className={styles.input}
          name="sex"
          onChange={(e) => {
            setSex(e.target.value);
          }}
        >
          <option value="1">Мужское</option>
          <option value="0">Женское</option>
        </select>

        <label className={styles.label}>Категория</label>
        <input
          type="text"
          name="category"
          className={styles.input}
          placeholder="Категория"
          value={category}
          onChange={(e) => categoryHandler(e.target.value, false)}
        />

        <label className={styles.label}>Быстрый выбор существующей категории</label>
        <select className={styles.input} onChange={(e) => categoryHandler(e.target.value, true)} name="categorySelect">
          <option value="custom">Создать новую...</option>
          {categories.map((c, i) => (
            <option value={c} key={i}>
              {c}
            </option>
          ))}
        </select>

        <label className={styles.label}>Количество на складе</label>
        <input
          type="text"
          name="quantity"
          className={styles.input}
          placeholder="Количество"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />

        <label className={styles.label}>Размеры</label>
        <div className={styles.sizesContainer}>
          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
            {sizes.map((s, i) => (
              <div key={i} className={styles.size}>
                <span style={{ width: '100%', margin: '5px' }}>{s}</span>
                <button className={styles.delButton} type="button" onClick={() => delSize(i)}>
                  x
                </button>
              </div>
            ))}
          </div>
          <input
            style={{ width: '70px' }}
            type="text"
            className={styles.input}
            value={addSize}
            onInput={(e) => {
              setAddSize(e.target.value);
            }}
          />
          <button type="button" style={{ width: '70px' }} className={styles.button} onClick={addSizeHandler}>
            +
          </button>
        </div>

        <div style={{ marginTop: '30px' }}>
          <div>
            <DragDropContext onDragEnd={onDragEndHandler}>
              <Droppable droppableId="droppable-1" direction="horizontal">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className={styles.images}>
                    {images.map((img, index) => (
                      <Draggable key={index + '-k'} draggableId={index + '-d'} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.image}
                            style={{
                              borderWidth: index === 0 ? '6px' : '1px',
                              backgroundImage: `url('${img}')`,
                              ...provided.draggableProps.style,
                            }}
                          >
                            <button
                              className={styles.delButton}
                              type="button"
                              onClick={() => {
                                deleteImage(index);
                              }}
                            >
                              X
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <label className={styles.fileLable + ' ' + styles.image} htmlFor="file">
            +
          </label>
          <input
            type="file"
            multiple={true}
            style={{ marginTop: '20px' }}
            id="file"
            className={styles.file}
            name="images"
            onChange={fileInputHandler}
          />
        </div>
        <button className={styles.button} type="submit" disabled={disabledSubmit}>
          {disabledSubmit ? <div className={styles.loading}>Загрузка...</div> : text}
        </button>
      </form>
    </div>
  );
}

export default WearFrom;
