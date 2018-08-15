export function shadow(color='#888888', { h=0, v='1px', blur='3px', spread=0, inset=false, }={}) {
  return {
    boxShadow: `${color} ${h} ${v} ${blur?blur:''} ${spread?spread:''}${inset?' inset':''}`,
  }
}
