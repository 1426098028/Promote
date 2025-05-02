import { EditableProTable } from '@ant-design/pro-components';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './index.less';
export default class TableForm extends PureComponent {
  static propTypes = {
    recordCreatorProps: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    editableKeys: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    KeyVal: PropTypes.string.isRequired,
    position: PropTypes.string,
    dataSourceChange: PropTypes.func.isRequired,
    editableKeysChange: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    onSave: PropTypes.func,
    toolBarRender: PropTypes.func,
    FormTitle: PropTypes.any,
  };
  static defaultProps = {
    KeyVal: '_id',
    position: 'top',
    recordCreatorProps: true,
  };
  render() {
    const { editableKeys, dataSource, columns, KeyVal, FormTitle, dataSourceChange, editableKeysChange, onSave, loading, recordCreatorProps, toolBarRender, expandable, position } = this.props;

    return (
      <EditableProTable
        className="TableForm"
        rowKey={KeyVal}
        loading={loading}
        headerTitle={FormTitle()}
        scroll={{
          x: '80%',
        }}
        recordCreatorProps={
          recordCreatorProps && {
            position: position,
            record: () => ({
              [KeyVal]: `${Math.random() * 1000000}new_id`,
            }),
          }
        }
        bordered={false}
        columns={columns}
        value={dataSource}
        onChange={dataSourceChange}
        toolBarRender={toolBarRender}
        expandable={expandable}
        editable={{
          type: 'single',
          editableKeys,
          onChange: editableKeysChange,
          onSave: onSave,
          actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
        }}
      />
    );
  }
}
