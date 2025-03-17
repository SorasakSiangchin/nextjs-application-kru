### input search

```html
<div className="relative ">
  <input
    type="text"
    id="Search"
    placeholder="ค้นหาสินค้า..."
    className="w-[20rem] rounded-md border-gray-200 py-2.5 pe-10 shadow-sm border-2 sm:text-sm p-3"
  />
  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
    <button type="button" className="text-gray-600 hover:text-gray-700">
      <span className="sr-only">Search</span>
      <!-- <BsSearch /> -->
    </button>
  </span>
</div>
```

###

### input select category

```html
<select
  className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm border-2 sm:text-sm p-3"
>
  <option value="">--- ประเภทสินค้า ---</option>
  <option value="JM">John Mayer</option>
  <option value="SRV">Stevie Ray Vaughn</option>
  <option value="JH">Jimi Hendrix</option>
  <option value="BBK">B.B King</option>
  <option value="AK">Albert King</option>
  <option value="BG">Buddy Guy</option>
  <option value="EC">Eric Clapton</option>
</select>
```

###

### input select sort

```html
<div>
  <select
    className="w-[10rem] rounded-md border-gray-200 py-2.5 pe-10 shadow-sm border-2 sm:text-sm p-3"
  >
    <option value="">--- เรียง ---</option>
  </select>
</div>
```

###

### Refer

- https://www.hyperui.dev/components/application-ui/inputs
